import { PrismaClient } from "@prisma/client";
import qmAPI from "quanmsms";

const config = useRuntimeConfig();
const smsApi = new qmAPI(config.apiOpenid.toString(), {
  sms: {
    apiKey: config.apiApikey,
  },
});
const db = new PrismaClient();
function generateRandomCode(length: number) {
  let code = "";
  //const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';复杂验证码
  const possible = "0123456789";
  for (let i = 0; i < length; i++) {
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return code;
}
function generateDeadline() {
  const now = new Date(); // 获取当前时间
  const threeMinutesLater = new Date(now.getTime() + 3.5 * 60 * 1000); // 加上3分钟
  return threeMinutesLater.toISOString(); // 转换为ISO格式字符串
}

function send(telstr: string) {
  let tel = parseInt(telstr);
  const code = generateRandomCode(6);
  let param = {
    tel: tel,
    model_id: config.apiSmsId.toString(),
    model_args: {
      //模板id对应的变量key值,object格式，内部自动处理成平台要求的str
      code: code,
      // 如果你的模板没变量，该值可为空
    },
  };
  return smsApi
    .sendSMS(param)
    .then((response: { code: number; state: number }) => {
      if (response.state == 200) {
        db.register
          .create({
            data: {
              phone: telstr,
              deadline: generateDeadline(),
              code: code,
            },
          })
          .then((reg) => {
            if (reg.phone == telstr) {
              console.info(telstr + "发送成功");
            }
          });
        return { code: 1, msg: "发送成功" };
      } else {
        console.info(tel);
        return { code: 0, msg: "发送失败", error: response };
      }
      // 你的业务代码
    });
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let isSend =
    (await db.register.findFirst({
      where: {
        phone: body.phone,
      },
    })) != null;
  if (isSend) {
    const register = (await db.register.findFirst({
      where: {
        phone: body.phone,
      },
      orderBy: {
        deadline: "desc", // 'asc' 表示升序，'desc' 表示降序
      },
    })) || {
      deadline: new Date(),
    };
    const deadlineDate = new Date(register.deadline);
    const now = new Date();
    if (now <= deadlineDate) {
      return { code: 2, msg: "三分钟内请勿重发送" };
    } else {
      return send(body.phone);
    }
  } else {
    return send(body.phone);
  }
});

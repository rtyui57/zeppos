import { MessageBuilder } from "../shared/message";

const messageBuilder = new MessageBuilder();
const logger = Logger.getLogger("SIDE_APP");

// Simulating an asynchronous network request using Promise
const mockAPI = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        body: {
          data: {
            text: "HELLO ZEPPOS",
          },
        },
      });
    }, 1000);
  });
};

const fetchData = async (ctx) => {
  try {
    logger.log("Hacer la peticion")
    //  const ress = await fetch({
    //    url: 'http://192.168.0.15:8080/mock/greetings',
    //    method: 'GET'
    //  })
    const ress = await fetch({
       url: 'http://192.168.0.15:8080/mock/register',
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
        'id': 'string',
        'timestamp': '2023-09-16T12:09:06.753Z',
        'coordenadas': {
          'latitud': 'string',
          'longitud': 'string'
        },
        'temperaturaAmbiente': 0,
        'temperaturaCorporal': 0,
        'ritmoCardiaco': 0,
        'kilometrosAcumulados': 0,
        'presion': 0,
        'oxigenoSangre': 0
       })
    })

    // A network request is simulated here
    const res = await mockAPI()
    const resBody = typeof res.body === 'string' ?  JSON.parse(res.body) : res.body

    ctx.response({
      data: { result: resBody.data },
    })

  } catch (error) {
    ctx.response({
      data: { result: "ERROR" },
    });
  }
};

AppSideService({
  onInit() {
    messageBuilder.listen(() => {});
    messageBuilder.on("request", (ctx) => {
      const jsonRpc = messageBuilder.buf2Json(ctx.request.payload);
      logger.log(jsonRpc.otro)
      if (jsonRpc.method === "GET_DATA") {
        return fetchData(ctx);
      }
    });
  },

  onRun() {},

  onDestroy() {},
});

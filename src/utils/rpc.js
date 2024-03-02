const NEAR_MAINNET_RPC = "https://rpc.mainnet.near.org/";

const NearRPC = {
  id: 0,
  send: (request) =>
    fetch(NEAR_MAINNET_RPC, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }),
  getWidget: async (accountId, widgetPath) => {
    return NearRPC.getWidgets(accountId, [widgetPath]);
  },
  getWidgets: async (accountId, widgetsPath) => {
    const keys = await NearRPC.getAccountWidgetKeys(accountId, widgetsPath);
    const chunks = NearRPC.chunkinize(keys);

    const widgets = chunks.map(async (chunk) => {
      const request = {
        keys: chunk.map((path) => NearRPC.getWidgetPath(accountId, path)),
      };

      const result = await NearRPC.send(NearRPC.createRequest(request));

      const response = await result.json();

      const {
        [accountId]: { widget },
      } = NearRPC.parseResponse(response);

      return widget;
    });

    return await Promise.all(widgets).then((result) =>
      result.reduce((acc, obj) => ({ ...acc, ...obj }), {}),
    );
  },
  getAccountWidgetKeys: async (accountId, widgetsPath) => {
    const request = {
      keys: widgetsPath.map((path) =>
        NearRPC.getWidgetPath(accountId, path),
      ),
    };

    const result = await NearRPC.send(
      NearRPC.createRequest(request, "keys"),
    );

    const response = await result.json();

    const {
      [accountId]: { widget: keys },
    } = NearRPC.parseResponse(response);

    return Object.keys(keys || []);
  },
  getAccountIndexWidget: async (accountId) => {
    const request = {
      keys: [`${accountId}/routes/index/**`],
    };

    const result = await NearRPC.send(
      NearRPC.createRequest(request),
    );

    const response = await result.json();

    return NearRPC.parseResponse(response);
  },
  createRequest: (args, method) => {
    return {
      method: "query",
      params: {
        request_type: "call_function",
        account_id: "social.near",
        method_name: method || "get",
        args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
        finality: "optimistic",
      },
      id: ++NearRPC.id,
      jsonrpc: "2.0",
    };
  },
  getWidgetPath: (accountId, widgetPath) => {
    return `${accountId}/widget/${widgetPath}`;
  },
  parseResponse: (response) => {
    const encodedData = NearRPC.processData(response.result.result);
    return JSON.parse(decodeURIComponent(escape(encodedData)));
  },
  processData: (data) => {
    let result = "";
    const chunkSize = 10000;

    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      result += String.fromCharCode(...chunk);
    }

    return result;
  },
  chunkinize: (data, size) => {
    return [...NearRPC.chunk(data, size || 100)];
  },
  chunk: function* (data, size) {
    for (let i = 0; i < data.length; i += size) {
      yield data.slice(i, i + size);
    }
  },
};

export default NearRPC;
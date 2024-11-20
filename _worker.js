export default {
  // 存储映射表：自定义 Key 与真实 API Key 的映射
  customKeys: {
    "sk-5Q3fwdCF0ZD8hHG9BRG4aHQUIApdtJr20jicUtaV25J1oN1c": "sk-svcacct-N6xCcj3O0pq3WF2lUtzDiJIu8jqHuPHyib2QCwepr2yGlQ8fQr9AFfTUOEbT3BlbkFJbXtLZT8qeEryCPWVcnYC3hPClcu9qgsjPrXSGqeT7RXw6zyb7HoMa7cUdAA",
    // 你可以预先生成多个自定义 API Key
  },

  async fetch(request) {
    const url = new URL(request.url);
    url.host = "api.openai.com";

    // 从请求头中获取传递的 API Key
    const customKey = request.headers.get("Authorization")?.replace("Bearer ", "");

    // 检查自定义 Key 是否存在于映射表
    const realKey = this.customKeys[customKey];
    if (!realKey) {
      return new Response("Invalid API Key", { status: 401 });
    }

    // 设置真实的 API Key
    const headers = new Headers(request.headers);
    headers.set("Authorization", "Bearer sk-svcacct-N6xCcj3O0pq3WF2lUtzDiJIu8jqHuPHyib2QCwepr2yGlQ8fQr9AFfTUOEbT3BlbkFJbXtLZT8qeEryCPWVcnYC3hPClcu9qgsjPrXSGqeT7RXw6zyb7HoMa7cUdAA");

    return fetch(url, {
      method: request.method,
      headers: headers,
      body: request.body,
      redirect: 'follow'
    });
  }
}

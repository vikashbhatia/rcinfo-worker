export default {
  async fetch(request) {
    const url = new URL(request.url);
    const rc = url.searchParams.get("rc");

    if (!rc) {
      return Response.json({ status: "error", message: "Missing rc parameter" });
    }

    try {
      const resp = await fetch(`https://vahanx.in/rc-search/${rc}`);
      const html = await resp.text();

      // TODO: parse HTML properly
      const details = { raw_html: html };

      return Response.json({
        status: "success",
        rc_number: rc,
        details,
        Join: "@LegendXTrick",
      });
    } catch (e) {
      return Response.json({
        status: "error",
        message: "Failed to fetch vehicle info",
      });
    }
  }
};

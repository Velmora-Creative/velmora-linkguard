const form = document.getElementById("scanForm");
    const urlInput = document.getElementById("websiteUrl");
    const message = document.getElementById("formMessage");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const rawValue = urlInput.value.trim();

      if (!rawValue) {
        showMessage("Please enter a website URL first.", "error");
        urlInput.focus();
        return;
      }

      let parsedUrl;
      try {
        parsedUrl = new URL(/^https?:\/\//i.test(rawValue) ? rawValue : `https://${rawValue}`);
      } catch {
        showMessage("That URL doesn't look valid. Check it and try again.", "error");
        urlInput.focus();
        return;
      }

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        showMessage("Please use a public website address beginning with http:// or https://.", "error");
        return;
      }

      if (!parsedUrl.hostname.includes(".") || parsedUrl.hostname === "localhost") {
        showMessage("Please enter a public domain, such as example.com.", "error");
        return;
      }

      // The scan API is intentionally not connected yet. Do not imply that a scan ran.
      showMessage(`URL looks valid (${parsedUrl.hostname}). The scanning engine will be connected in the next development step.`, "notice");
    });

    function showMessage(text, type) {
      message.textContent = text;
      message.className = `form-message ${type || ""}`;
    }

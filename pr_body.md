🎯 **What:** The use of `innerHTML` in `src/main.js` has been replaced with safer DOM manipulation methods.
⚠️ **Risk:** Although the current string assigned to `innerHTML` is hardcoded and safe, using `innerHTML` is generally considered a bad practice as it can lead to Cross-Site Scripting (XSS) vulnerabilities if dynamic or user-supplied data is introduced later.
🛡️ **Solution:** Replaced `innerHTML` with `document.createElement`, `textContent`, and `appendChild`. These methods treat the input strictly as data, neutralizing any potential malicious scripts and eliminating the risk of XSS.

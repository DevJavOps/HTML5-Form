let xmlData = "";

document.getElementById("loginForm").addEventListener("submit", function (e) {
  const email1 = document.getElementById("email1").value;
  const email2 = document.getElementById("email2").value;
  const emailError = document.getElementById("emailError");

  if (email1 !== email2) {
    e.preventDefault();
    emailError.textContent = "Emails do not match.";
    document.getElementById("downloadXmlBtn").style.display = "none";
  } else {
    e.preventDefault(); // Prevent actual form submission

    emailError.textContent = "";

    // Collect all form data
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email1.value,
      birthdate: form.birthdate.value,
      phone: form.phone.value,
      comment: form.comment.value,
      password: form.password.value,
    };

    // Generate XML string
    xmlData = `<user>
  <name>${data.name}</name>
  <email>${data.email}</email>
  <birthdate>${data.birthdate}</birthdate>
  <phone>${data.phone}</phone>
  <comment>${data.comment}</comment>
  <password>${data.password}</password>
</user>`;

    // Show download button
    document.getElementById("downloadXmlBtn").style.display = "block";
  }
});

document
  .getElementById("downloadXmlBtn")
  .addEventListener("click", function () {
    // Create a Blob with the XML data
    const blob = new Blob([xmlData], { type: "application/xml" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link to trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = "user_data.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

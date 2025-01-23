// JavaScript functionality for the Maternal Health Risk Prediction

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("healthForm");
  const resultDiv = document.getElementById("result");
  const languageSwitch = document.getElementById("languageSwitch");

  // Default language
  let currentLanguage = "en";

  // Translations for English and Hindi
  const translations = {
    en: {
      headerTitle: "Maternal Health Risk Prediction",
      formTitle: "Enter Patient Details",
      labelAge: "Age",
      labelSystolic: "Systolic Blood Pressure",
      labelDiastolic: "Diastolic Blood Pressure",
      labelGlucose: "Blood Glucose Level",
      labelTemperature: "Body Temperature",
      labelHeartRate: "Heart Rate",
      submitButton: "Predict Risk Level",
      resultError: "Error: Unable to predict risk level.",
      resultHigh: "Risk Level: High Risk",
      resultLow: "Risk Level: Low Risk",
      languageSwitch: "Switch to Hindi",
    },
    hi: {
      headerTitle: "मातृ स्वास्थ्य जोखिम भविष्यवाणी",
      formTitle: "मरीज का विवरण दर्ज करें",
      labelAge: "आयु",
      labelSystolic: "सिस्टोलिक रक्तचाप",
      labelDiastolic: "डायस्टोलिक रक्तचाप",
      labelGlucose: "रक्त ग्लूकोज स्तर",
      labelTemperature: "शरीर का तापमान",
      labelHeartRate: "दिल की धड़कन",
      submitButton: "जोखिम स्तर का अनुमान लगाएं",
      resultError: "त्रुटि: जोखिम स्तर का अनुमान नहीं लगाया जा सका।",
      resultHigh: "जोखिम स्तर: उच्च जोखिम",
      resultLow: "जोखिम स्तर: कम जोखिम",
      languageSwitch: "अंग्रेजी में बदलें",
    },
  };

  // Function to update text based on the selected language
  const updateLanguage = () => {
    const langData = translations[currentLanguage];

    document.getElementById("headerTitle").innerText = langData.headerTitle;
    document.getElementById("formTitle").innerText = langData.formTitle;
    document.getElementById("labelAge").innerText = langData.labelAge;
    document.getElementById("labelSystolic").innerText = langData.labelSystolic;
    document.getElementById("labelDiastolic").innerText =
      langData.labelDiastolic;
    document.getElementById("labelGlucose").innerText = langData.labelGlucose;
    document.getElementById("labelTemperature").innerText =
      langData.labelTemperature;
    document.getElementById("labelHeartRate").innerText =
      langData.labelHeartRate;
    document.getElementById("submitButton").innerText = langData.submitButton;
    document.getElementById("languageSwitch").innerText =
      langData.languageSwitch;
  };

  // Event listener for the language switch button
  languageSwitch.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "hi" : "en";
    updateLanguage();
  });

  // Form submission handler
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Gather input values
    const age = document.getElementById("age").value;
    const systolic = document.getElementById("systolic").value;
    const diastolic = document.getElementById("diastolic").value;
    const glucose = document.getElementById("glucose").value;
    const temperature = document.getElementById("temperature").value;
    const heartRate = document.getElementById("heartRate").value;

    // Simulating backend interaction
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age,
          systolic,
          diastolic,
          glucose,
          temperature,
          heartRate,
        }),
      });

      const data = await response.json();

      // Display result
      resultDiv.style.display = "block";
      if (data.riskLevel === "High Risk") {
        resultDiv.textContent =
          currentLanguage === "en"
            ? translations.en.resultHigh
            : translations.hi.resultHigh;
        resultDiv.style.color = "red";
      } else {
        resultDiv.textContent =
          currentLanguage === "en"
            ? translations.en.resultLow
            : translations.hi.resultLow;
        resultDiv.style.color = "green";
      }
    } catch (error) {
      resultDiv.style.display = "block";
      resultDiv.textContent =
        currentLanguage === "en"
          ? translations.en.resultError
          : translations.hi.resultError;
      resultDiv.style.color = "orange";
    }
  });

  // Initializing text with the default language
  updateLanguage();
});

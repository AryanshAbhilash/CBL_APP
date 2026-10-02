// ===============================
// PHYTOSENSE APP
// Simulated Sensors + AI Assistant
// ===============================


// ===============================
// SENSOR DATA
// ===============================

let sensorData = {
    moisture: 42,
    temperature: 28.4,
    humidity: 67,
    nitrogen: 45,
    phosphorus: 32,
    potassium: 51
};


// ===============================
// DOM ELEMENTS
// ===============================

const moistureValue = document.getElementById("moistureValue");
const temperatureValue = document.getElementById("temperatureValue");
const humidityValue = document.getElementById("humidityValue");

const nitrogenValue = document.getElementById("nitrogenValue");
const phosphorusValue = document.getElementById("phosphorusValue");
const potassiumValue = document.getElementById("potassiumValue");

const cropStatus = document.getElementById("cropStatus");
const adviceText = document.getElementById("adviceText");

const languageSelect = document.getElementById("languageSelect");

const microphoneButton = document.getElementById("microphoneButton");
const questionText = document.getElementById("questionText");
const answerText = document.getElementById("answerText");

const lastUpdated = document.getElementById("lastUpdated");


// ===============================
// UPDATE SENSOR DISPLAY
// ===============================

function updateDisplay() {

    if (moistureValue) {
        moistureValue.textContent = sensorData.moisture + "%";
    }

    if (temperatureValue) {
        temperatureValue.textContent =
            sensorData.temperature.toFixed(1) + "°C";
    }

    if (humidityValue) {
        humidityValue.textContent =
            sensorData.humidity + "%";
    }

    if (nitrogenValue) {
        nitrogenValue.textContent =
            sensorData.nitrogen + " mg/kg";
    }

    if (phosphorusValue) {
        phosphorusValue.textContent =
            sensorData.phosphorus + " mg/kg";
    }

    if (potassiumValue) {
        potassiumValue.textContent =
            sensorData.potassium + " mg/kg";
    }

    updateAdvice();
    updateChart();
    updateTime();
}


// ===============================
// CROP / WATERING ADVICE
// ===============================

function updateAdvice() {

    let status;
    let advice;

    if (sensorData.moisture < 30) {

        status = "Needs Water";

        advice =
            "Watering is recommended today because the soil moisture is low.";

    } else if (sensorData.moisture > 65) {

        status = "Too Wet";

        advice =
            "Do not water today. The soil already has enough moisture.";

    } else {

        status = "Healthy";

        advice =
            "You do not need to water today. The soil moisture is currently adequate.";
    }

    if (cropStatus) {
        cropStatus.textContent = status;
    }

    if (adviceText) {
        adviceText.textContent = advice;
    }
}


// ===============================
// SIMULATE SENSOR CHANGES
// ===============================

function updateSensors() {

    sensorData.moisture =
        Math.floor(Math.random() * 51) + 20;

    sensorData.temperature =
        Number((Math.random() * 8 + 25).toFixed(1));

    sensorData.humidity =
        Math.floor(Math.random() * 31) + 50;

    sensorData.nitrogen =
        Math.floor(Math.random() * 31) + 35;

    sensorData.phosphorus =
        Math.floor(Math.random() * 26) + 20;

    sensorData.potassium =
        Math.floor(Math.random() * 31) + 40;

    updateDisplay();
}


// ===============================
// LAST UPDATED TIME
// ===============================

function updateTime() {

    if (!lastUpdated) {
        return;
    }

    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    lastUpdated.textContent =
        "Last updated: " + time;
}


// ===============================
// WATERING ANSWER
// ===============================

function getWaterAnswer(language) {

    const moisture = sensorData.moisture;

    const answers = {

        "en-IN": {

            low:
                `Yes. You should water your plants today because the soil moisture is low at ${moisture} percent.`,

            normal:
                `No. You do not need to water your plants today. The soil moisture is ${moisture} percent and is adequate.`,

            high:
                `No. Do not water your plants today. The soil moisture is already high at ${moisture} percent.`
        },

        "hi-IN": {

            low:
                `हाँ। आपको आज अपने पौधों को पानी देना चाहिए क्योंकि मिट्टी में नमी ${moisture} प्रतिशत है, जो कम है।`,

            normal:
                `नहीं। आपको आज अपने पौधों को पानी देने की जरूरत नहीं है। मिट्टी में नमी ${moisture} प्रतिशत है और यह पर्याप्त है।`,

            high:
                `नहीं। आपको आज अपने पौधों को पानी नहीं देना चाहिए। मिट्टी में नमी पहले से ही ${moisture} प्रतिशत है, जो अधिक है।`
        },

        "mr-IN": {

            low:
                `होय. तुम्ही आज तुमच्या झाडांना पाणी द्यावे कारण मातीतील आर्द्रता ${moisture} टक्के आहे, जी कमी आहे.`,

            normal:
                `नाही. तुम्हाला आज तुमच्या झाडांना पाणी देण्याची गरज नाही. मातीतील आर्द्रता ${moisture} टक्के आहे आणि ती पुरेशी आहे.`,

            high:
                `नाही. तुम्ही आज तुमच्या झाडांना पाणी देऊ नये. मातीतील आर्द्रता आधीच ${moisture} टक्के आहे, जी जास्त आहे.`
        },

        "ta-IN": {

            low:
                `ஆம். இன்று உங்கள் செடிகளுக்கு தண்ணீர் கொடுக்க வேண்டும். மண்ணின் ஈரப்பதம் ${moisture} சதவீதம் மட்டுமே உள்ளது.`,

            normal:
                `இல்லை. இன்று உங்கள் செடிகளுக்கு தண்ணீர் கொடுக்க தேவையில்லை. மண்ணின் ஈரப்பதம் ${moisture} சதவீதம் மற்றும் போதுமானதாக உள்ளது.`,

            high:
                `இல்லை. இன்று உங்கள் செடிகளுக்கு தண்ணீர் கொடுக்க வேண்டாம். மண்ணில் ஏற்கனவே ${moisture} சதவீதம் ஈரப்பதம் உள்ளது.`
        },

        "te-IN": {

            low:
                `అవును. మీరు ఈరోజు మీ మొక్కలకు నీరు ఇవ్వాలి. నేలలో తేమ ${moisture} శాతం మాత్రమే ఉంది.`,

            normal:
                `లేదు. మీరు ఈరోజు మీ మొక్కలకు నీరు ఇవ్వాల్సిన అవసరం లేదు. నేలలో తేమ ${moisture} శాతం ఉంది మరియు ఇది సరిపోతుంది.`,

            high:
                `లేదు. మీరు ఈరోజు మీ మొక్కలకు నీరు ఇవ్వకూడదు. నేలలో ఇప్పటికే ${moisture} శాతం తేమ ఉంది.`
        },

        "kn-IN": {

            low:
                `ಹೌದು. ನೀವು ಇಂದು ನಿಮ್ಮ ಸಸ್ಯಗಳಿಗೆ ನೀರು ಹಾಕಬೇಕು. ಮಣ್ಣಿನ ತೇವಾಂಶ ${moisture} ಶೇಕಡಾ ಮಾತ್ರ ಇದೆ.`,

            normal:
                `ಇಲ್ಲ. ನೀವು ಇಂದು ನಿಮ್ಮ ಸಸ್ಯಗಳಿಗೆ ನೀರು ಹಾಕುವ ಅಗತ್ಯವಿಲ್ಲ. ಮಣ್ಣಿನ ತೇವಾಂಶ ${moisture} ಶೇಕಡಾ ಇದೆ ಮತ್ತು ಸಾಕಷ್ಟಿದೆ.`,

            high:
                `ಇಲ್ಲ. ನೀವು ಇಂದು ನಿಮ್ಮ ಸಸ್ಯಗಳಿಗೆ ನೀರು ಹಾಕಬಾರದು. ಮಣ್ಣಿನಲ್ಲಿ ಈಗಾಗಲೇ ${moisture} ಶೇಕಡಾ ತೇವಾಂಶವಿದೆ.`
        },

        "ml-IN": {

            low:
                `അതെ. ഇന്ന് നിങ്ങളുടെ ചെടികൾക്ക് വെള്ളം നൽകണം. മണ്ണിലെ ഈർപ്പം ${moisture} ശതമാനം മാത്രമാണ്.`,

            normal:
                `ഇല്ല. ഇന്ന് നിങ്ങളുടെ ചെടികൾക്ക് വെള്ളം നൽകേണ്ട ആവശ്യമില്ല. മണ്ണിലെ ഈർപ്പം ${moisture} ശതമാനമാണ്, അത് മതിയായതാണ്.`,

            high:
                `ഇല്ല. ഇന്ന് നിങ്ങളുടെ ചെടികൾക്ക് വെള്ളം നൽകരുത്. മണ്ണിൽ ഇതിനകം ${moisture} ശതമാനം ഈർപ്പമുണ്ട്.`
        },

        "bn-IN": {

            low:
                `হ্যাঁ। আজ আপনার গাছে জল দেওয়া উচিত কারণ মাটির আর্দ্রতা মাত্র ${moisture} শতাংশ।`,

            normal:
                `না। আজ আপনার গাছে জল দেওয়ার প্রয়োজন নেই। মাটির আর্দ্রতা ${moisture} শতাংশ এবং এটি যথেষ্ট।`,

            high:
                `না। আজ আপনার গাছে জল দেবেন না। মাটিতে ইতিমধ্যেই ${moisture} শতাংশ আর্দ্রতা রয়েছে।`
        },

        "gu-IN": {

            low:
                `હા. તમારે આજે તમારા છોડને પાણી આપવું જોઈએ કારણ કે જમીનની ભેજ માત્ર ${moisture} ટકા છે.`,

            normal:
                `ના. તમારે આજે તમારા છોડને પાણી આપવાની જરૂર નથી. જમીનની ભેજ ${moisture} ટકા છે અને પૂરતી છે.`,

            high:
                `ના. આજે તમારા છોડને પાણી ન આપો. જમીનમાં પહેલેથી જ ${moisture} ટકા ભેજ છે.`
        },

        "pa-IN": {

            low:
                `ਹਾਂ। ਤੁਹਾਨੂੰ ਅੱਜ ਆਪਣੇ ਪੌਦਿਆਂ ਨੂੰ ਪਾਣੀ ਦੇਣਾ ਚਾਹੀਦਾ ਹੈ ਕਿਉਂਕਿ ਮਿੱਟੀ ਵਿੱਚ ਨਮੀ ਸਿਰਫ਼ ${moisture} ਪ੍ਰਤੀਸ਼ਤ ਹੈ।`,

            normal:
                `ਨਹੀਂ। ਤੁਹਾਨੂੰ ਅੱਜ ਆਪਣੇ ਪੌਦਿਆਂ ਨੂੰ ਪਾਣੀ ਦੇਣ ਦੀ ਲੋੜ ਨਹੀਂ ਹੈ। ਮਿੱਟੀ ਵਿੱਚ ਨਮੀ ${moisture} ਪ੍ਰਤੀਸ਼ਤ ਹੈ ਅਤੇ ਇਹ ਕਾਫ਼ੀ ਹੈ।`,

            high:
                `ਨਹੀਂ। ਅੱਜ ਆਪਣੇ ਪੌਦਿਆਂ ਨੂੰ ਪਾਣੀ ਨਾ ਦਿਓ। ਮਿੱਟੀ ਵਿੱਚ ਪਹਿਲਾਂ ਹੀ ${moisture} ਪ੍ਰਤੀਸ਼ਤ ਨਮੀ ਹੈ।`
        }
    };

    const selectedLanguage =
        answers[language] ? language : "en-IN";

    if (moisture < 30) {
        return answers[selectedLanguage].low;
    }

    if (moisture > 65) {
        return answers[selectedLanguage].high;
    }

    return answers[selectedLanguage].normal;
}


// ===============================
// SOIL MOISTURE ANSWER
// ===============================

function getMoistureAnswer(language) {

    const value = sensorData.moisture;

    const answers = {

        "en-IN":
            `The current soil moisture level is ${value} percent.`,

        "hi-IN":
            `मिट्टी में नमी का वर्तमान स्तर ${value} प्रतिशत है।`,

        "mr-IN":
            `मातीतील सध्याची आर्द्रता ${value} टक्के आहे।`,

        "ta-IN":
            `தற்போதைய மண் ஈரப்பதம் ${value} சதவீதம் ஆகும்.`,

        "te-IN":
            `ప్రస్తుతం నేల తేమ స్థాయి ${value} శాతం ఉంది.`,

        "kn-IN":
            `ಪ್ರಸ್ತುತ ಮಣ್ಣಿನ ತೇವಾಂಶ ಮಟ್ಟ ${value} ಶೇಕಡಾ ಇದೆ.`,

        "ml-IN":
            `നിലവിലെ മണ്ണിലെ ഈർപ്പം ${value} ശതമാനമാണ്.`,

        "bn-IN":
            `বর্তমান মাটির আর্দ্রতার মাত্রা ${value} শতাংশ।`,

        "gu-IN":
            `હાલની જમીનની ભેજનું સ્તર ${value} ટકા છે.`,

        "pa-IN":
            `ਮਿੱਟੀ ਵਿੱਚ ਨਮੀ ਦਾ ਮੌਜੂਦਾ ਪੱਧਰ ${value} ਪ੍ਰਤੀਸ਼ਤ ਹੈ।`
    };

    return answers[language] || answers["en-IN"];
}


// ===============================
// TEMPERATURE ANSWER
// ===============================

function getTemperatureAnswer(language) {

    const value = sensorData.temperature;

    const answers = {

        "en-IN":
            `The current soil temperature is ${value} degrees Celsius.`,

        "hi-IN":
            `मिट्टी का वर्तमान तापमान ${value} डिग्री सेल्सियस है।`,

        "mr-IN":
            `मातीचे सध्याचे तापमान ${value} अंश सेल्सिअस आहे।`,

        "ta-IN":
            `தற்போதைய மண் வெப்பநிலை ${value} டிகிரி செல்சியஸ் ஆகும்.`,

        "te-IN":
            `ప్రస్తుతం నేల ఉష్ణోగ్రత ${value} డిగ్రీల సెల్సియస్ ఉంది.`,

        "kn-IN":
            `ಪ್ರಸ್ತುತ ಮಣ್ಣಿನ ತಾಪಮಾನ ${value} ಡಿಗ್ರಿ ಸೆಲ್ಸಿಯಸ್ ಇದೆ.`,

        "ml-IN":
            `നിലവിലെ മണ്ണിന്റെ താപനില ${value} ഡിഗ്രി സെൽഷ്യസാണ്.`,

        "bn-IN":
            `বর্তমান মাটির তাপমাত্রা ${value} ডিগ্রি সেলসিয়াস।`,

        "gu-IN":
            `હાલનું જમીનનું તાપમાન ${value} ડિગ્રી સેલ્સિયસ છે.`,

        "pa-IN":
            `ਮਿੱਟੀ ਦਾ ਮੌਜੂਦਾ ਤਾਪਮਾਨ ${value} ਡਿਗਰੀ ਸੈਲਸੀਅਸ ਹੈ।`
    };

    return answers[language] || answers["en-IN"];
}


// ===============================
// HUMIDITY ANSWER
// ===============================

function getHumidityAnswer(language) {

    const value = sensorData.humidity;

    const answers = {

        "en-IN":
            `The current humidity level is ${value} percent.`,

        "hi-IN":
            `वर्तमान आर्द्रता का स्तर ${value} प्रतिशत है।`,

        "mr-IN":
            `सध्याची आर्द्रता ${value} टक्के आहे।`,

        "ta-IN":
            `தற்போதைய ஈரப்பதம் ${value} சதவீதம் ஆகும்.`,

        "te-IN":
            `ప్రస్తుతం తేమ స్థాయి ${value} శాతం ఉంది.`,

        "kn-IN":
            `ಪ್ರಸ್ತುತ ತೇವಾಂಶ ಮಟ್ಟ ${value} ಶೇಕಡಾ ಇದೆ.`,

        "ml-IN":
            `നിലവിലെ ഈർപ്പം ${value} ശതമാനമാണ്.`,

        "bn-IN":
            `বর্তমান আর্দ্রতার মাত্রা ${value} শতাংশ।`,

        "gu-IN":
            `હાલનું ભેજનું સ્તર ${value} ટકા છે.`,

        "pa-IN":
            `ਮੌਜੂਦਾ ਨਮੀ ਦਾ ਪੱਧਰ ${value} ਪ੍ਰਤੀਸ਼ਤ ਹੈ।`
    };

    return answers[language] || answers["en-IN"];
}


// ===============================
// NITROGEN ANSWER
// ===============================

function getNitrogenAnswer(language) {

    const value = sensorData.nitrogen;

    const answers = {

        "en-IN":
            `The current nitrogen level is ${value} milligrams per kilogram.`,

        "hi-IN":
            `वर्तमान नाइट्रोजन स्तर ${value} मिलीग्राम प्रति किलोग्राम है।`,

        "mr-IN":
            `सध्याची नायट्रोजन पातळी ${value} मिलीग्राम प्रति किलोग्राम आहे।`,

        "ta-IN":
            `தற்போதைய நைட்ரஜன் அளவு ஒரு கிலோகிராமிற்கு ${value} மில்லிகிராம் ஆகும்.`,

        "te-IN":
            `ప్రస్తుతం నత్రజని స్థాయి కిలోగ్రాముకు ${value} మిల్లీగ్రాములు ఉంది.`,

        "kn-IN":
            `ಪ್ರಸ್ತುತ ಸಾರಜನಕ ಮಟ್ಟವು ಪ್ರತಿ ಕಿಲೋಗ್ರಾಂಗೆ ${value} ಮಿಲಿಗ್ರಾಂ ಇದೆ.`,

        "ml-IN":
            `നിലവിലെ നൈട്രജൻ നില ഒരു കിലോഗ്രാമിന് ${value} മില്ലിഗ്രാം ആണ്.`,

        "bn-IN":
            `বর্তমান নাইট্রোজেনের মাত্রা প্রতি কিলোগ্রামে ${value} মিলিগ্রাম।`,

        "gu-IN":
            `હાલનું નાઇટ્રોજન સ્તર પ્રતિ કિલોગ્રામ ${value} મિલિગ્રામ છે.`,

        "pa-IN":
            `ਮੌਜੂਦਾ ਨਾਈਟ੍ਰੋਜਨ ਪੱਧਰ ਪ੍ਰਤੀ ਕਿਲੋਗ੍ਰਾਮ ${value} ਮਿਲੀਗ੍ਰਾਮ ਹੈ।`
    };

    return answers[language] || answers["en-IN"];
}


// ===============================
// PHOSPHORUS ANSWER
// ===============================

function getPhosphorusAnswer(language) {

    const value = sensorData.phosphorus;

    const answers = {

        "en-IN":
            `The current phosphorus level is ${value} milligrams per kilogram.`,

        "hi-IN":
            `वर्तमान फॉस्फोरस स्तर ${value} मिलीग्राम प्रति किलोग्राम है।`,

        "mr-IN":
            `सध्याची फॉस्फरस पातळी ${value} मिलीग्राम प्रति किलोग्राम आहे।`,

        "ta-IN":
            `தற்போதைய பாஸ்பரஸ் அளவு ஒரு கிலோகிராமிற்கு ${value} மில்லிகிராம் ஆகும்.`,

        "te-IN":
            `ప్రస్తుతం భాస్వరం స్థాయి కిలోగ్రాముకు ${value} మిల్లీగ్రాములు ఉంది.`,

        "kn-IN":
            `ಪ್ರಸ್ತುತ ರಂಜಕ ಮಟ್ಟವು ಪ್ರತಿ ಕಿಲೋಗ್ರಾಂಗೆ ${value} ಮಿಲಿಗ್ರಾಂ ಇದೆ.`,

        "ml-IN":
            `നിലവിലെ ഫോസ്ഫറസ് നില ഒരു കിലോഗ്രാമിന് ${value} മില്ലിഗ്രാം ആണ്.`,

        "bn-IN":
            `বর্তমান ফসফরাসের মাত্রা প্রতি কিলোগ্রামে ${value} মিলিগ্রাম।`,

        "gu-IN":
            `હાલનું ફોસ્ફરસ સ્તર પ્રતિ કિલોગ્રામ ${value} મિલિગ્રામ છે.`,

        "pa-IN":
            `ਮੌਜੂਦਾ ਫਾਸਫੋਰਸ ਪੱਧਰ ਪ੍ਰਤੀ ਕਿਲੋਗ੍ਰਾਮ ${value} ਮਿਲੀਗ੍ਰਾਮ ਹੈ।`
    };

    return answers[language] || answers["en-IN"];
}


// ===============================
// POTASSIUM ANSWER
// ===============================

function getPotassiumAnswer(language) {

    const value = sensorData.potassium;

    const answers = {

        "en-IN":
            `The current potassium level is ${value} milligrams per kilogram.`,

        "hi-IN":
            `वर्तमान पोटैशियम स्तर ${value} मिलीग्राम प्रति किलोग्राम है।`,

        "mr-IN":
            `सध्याची पोटॅशियम पातळी ${value} मिलीग्राम प्रति किलोग्राम आहे।`,

        "ta-IN":
            `தற்போதைய பொட்டாசியம் அளவு ஒரு கிலோகிராமிற்கு ${value} மில்லிகிராம் ஆகும்.`,

        "te-IN":
            `ప్రస్తుతం పొటాషియం స్థాయి కిలోగ్రాముకు ${value} మిల్లీగ్రాములు ఉంది.`,

        "kn-IN":
            `ಪ್ರಸ್ತುತ ಪೊಟ್ಯಾಸಿಯಮ್ ಮಟ್ಟವು ಪ್ರತಿ ಕಿಲೋಗ್ರಾಂಗೆ ${value} ಮಿಲಿಗ್ರಾಂ ಇದೆ.`,

        "ml-IN":
            `നിലവിലെ പൊട്ടാസ്യം നില ഒരു കിലോഗ്രാമിന് ${value} മില്ലിഗ്രാം ആണ്.`,

        "bn-IN":
            `বর্তমান পটাশিয়ামের মাত্রা প্রতি কিলোগ্রামে ${value} মিলিগ্রাম।`,

        "gu-IN":
            `હાલનું પોટેશિયમ સ્તર પ્રતિ કિલોગ્રામ ${value} મિલિગ્રામ છે.`,

        "pa-IN":
            `ਮੌਜੂਦਾ ਪੋਟਾਸ਼ੀਅਮ ਪੱਧਰ ਪ੍ਰਤੀ ਕਿਲੋਗ੍ਰਾਮ ${value} ਮਿਲੀਗ੍ਰਾਮ ਹੈ।`
    };

    return answers[language] || answers["en-IN"];
}


// ===============================
// NPK ANSWER
// ===============================

function getNPKAnswer(language) {

    const n = sensorData.nitrogen;
    const p = sensorData.phosphorus;
    const k = sensorData.potassium;

    const answers = {

        "en-IN":
            `Your current NPK levels are nitrogen ${n}, phosphorus ${p}, and potassium ${k} milligrams per kilogram.`,

        "hi-IN":
            `आपकी वर्तमान NPK मात्रा नाइट्रोजन ${n}, फॉस्फोरस ${p} और पोटैशियम ${k} मिलीग्राम प्रति किलोग्राम है।`,

        "mr-IN":
            `तुमच्या सध्याच्या NPK पातळीमध्ये नायट्रोजन ${n}, फॉस्फरस ${p} आणि पोटॅशियम ${k} मिलीग्राम प्रति किलोग्राम आहे।`,

        "ta-IN":
            `உங்கள் தற்போதைய NPK அளவுகள் நைட்ரஜன் ${n}, பாஸ்பரஸ் ${p}, மற்றும் பொட்டாசியம் ${k} மில்லிகிராம் ஒரு கிலோகிராமிற்கு ஆகும்.`,

        "te-IN":
            `మీ ప్రస్తుత NPK స్థాయిలు నత్రజని ${n}, భాస్వరం ${p}, మరియు పొటాషియం ${k} మిల్లీగ్రాములు కిలోగ్రాముకు ఉన్నాయి.`,

        "kn-IN":
            `ನಿಮ್ಮ ಪ್ರಸ್ತುತ NPK ಮಟ್ಟಗಳು ಸಾರಜನಕ ${n}, ರಂಜಕ ${p}, ಮತ್ತು ಪೊಟ್ಯಾಸಿಯಮ್ ${k} ಮಿಲಿಗ್ರಾಂ ಪ್ರತಿ ಕಿಲೋಗ್ರಾಂಗೆ ಇವೆ.`,

        "ml-IN":
            `നിങ്ങളുടെ നിലവിലെ NPK നിലകൾ നൈട്രജൻ ${n}, ഫോസ്ഫറസ് ${p}, പൊട്ടാസ്യം ${k} മില്ലിഗ്രാം ഒരു കിലോഗ്രാമിന് ആണ്.`,

        "bn-IN":
            `আপনার বর্তমান NPK মাত্রা হলো নাইট্রোজেন ${n}, ফসফরাস ${p}, এবং পটাশিয়াম ${k} মিলিগ্রাম প্রতি কিলোগ্রামে।`,

        "gu-IN":
            `તમારા હાલના NPK સ્તરો નાઇટ્રોજન ${n}, ફોસ્ફરસ ${p}, અને પોટેશિયમ ${k} મિલિગ્રામ પ્રતિ કિલોગ્રામ છે.`,

        "pa-IN":
            `ਤੁਹਾਡੇ ਮੌਜੂਦਾ NPK ਪੱਧਰ ਨਾਈਟ੍ਰੋਜਨ ${n}, ਫਾਸਫੋਰਸ ${p}, ਅਤੇ ਪੋਟਾਸ਼ੀਅਮ ${k} ਮਿਲੀਗ੍ਰਾਮ ਪ੍ਰਤੀ ਕਿਲੋਗ੍ਰਾਮ ਹਨ।`
    };

    return answers[language] || answers["en-IN"];
}


// ===============================
// GENERAL SOIL SUMMARY
// ===============================

function getSoilSummary(language) {

    const moisture = sensorData.moisture;

    let englishStatus;

    if (moisture < 30) {

        englishStatus =
            `The soil is currently dry, so watering is recommended today.`;

    } else if (moisture > 65) {

        englishStatus =
            `The soil is currently very wet, so you should not water today.`;

    } else {

        englishStatus =
            `The soil moisture is currently adequate, so you do not need to water today.`;
    }

    const answers = {

        "en-IN":
            `The current soil moisture is ${moisture} percent. ${englishStatus}`,

        "hi-IN":
            `मिट्टी में नमी ${moisture} प्रतिशत है। ${englishStatus}`,

        "mr-IN":
            `मातीतील आर्द्रता ${moisture} टक्के आहे। ${englishStatus}`,

        "ta-IN":
            `மண்ணின் ஈரப்பதம் ${moisture} சதவீதம். ${englishStatus}`,

        "te-IN":
            `నేల తేమ ${moisture} శాతం ఉంది. ${englishStatus}`,

        "kn-IN":
            `ಮಣ್ಣಿನ ತೇವಾಂಶ ${moisture} ಶೇಕಡಾ ಇದೆ. ${englishStatus}`,

        "ml-IN":
            `മണ്ണിലെ ഈർപ്പം ${moisture} ശതമാനമാണ്. ${englishStatus}`,

        "bn-IN":
            `মাটির আর্দ্রতা ${moisture} শতাংশ। ${englishStatus}`,

        "gu-IN":
            `જમીનની ભેજ ${moisture} ટકા છે. ${englishStatus}`,

        "pa-IN":
            `ਮਿੱਟੀ ਵਿੱਚ ਨਮੀ ${moisture} ਪ੍ਰਤੀਸ਼ਤ ਹੈ। ${englishStatus}`
    };

    return answers[language] || answers["en-IN"];
}


// ===============================
// UNKNOWN QUESTION
// ===============================

function getUnknownAnswer(language) {

    const answers = {

        "en-IN":
            "I can tell you about soil moisture, temperature, humidity, nitrogen, phosphorus, potassium, NPK, and whether you should water today.",

        "hi-IN":
            "मैं आपको मिट्टी की नमी, तापमान, आर्द्रता, नाइट्रोजन, फॉस्फोरस, पोटैशियम, NPK और आज पानी देना है या नहीं, इसके बारे में बता सकता हूँ।",

        "mr-IN":
            "मी तुम्हाला मातीतील आर्द्रता, तापमान, नायट्रोजन, फॉस्फरस, पोटॅशियम, NPK आणि आज पाणी द्यायचे आहे का याबद्दल सांगू शकतो।",

        "ta-IN":
            "மண் ஈரப்பதம், வெப்பநிலை, ஈரப்பதம், நைட்ரஜன், பாஸ்பரஸ், பொட்டாசியம், NPK மற்றும் இன்று தண்ணீர் கொடுக்க வேண்டுமா என்பதை நான் சொல்ல முடியும்.",

        "te-IN":
            "నేల తేమ, ఉష్ణోగ్రత, తేమ, నత్రజని, భాస్వరం, పొటాషియం, NPK మరియు ఈరోజు నీరు ఇవ్వాలా అనే విషయాన్ని నేను చెప్పగలను.",

        "kn-IN":
            "ನಾನು ಮಣ್ಣಿನ ತೇವಾಂಶ, ತಾಪಮಾನ, ತೇವಾಂಶ ಮಟ್ಟ, ಸಾರಜನಕ, ರಂಜಕ, ಪೊಟ್ಯಾಸಿಯಮ್, NPK ಮತ್ತು ಇಂದು ನೀರು ಹಾಕಬೇಕೇ ಎಂಬುದನ್ನು ಹೇಳಬಹುದು.",

        "ml-IN":
            "മണ്ണിലെ ഈർപ്പം, താപനില, നൈട്രജൻ, ഫോസ്ഫറസ്, പൊട്ടാസ്യം, NPK, ഇന്ന് വെള്ളം നൽകണമോ എന്നിവയെക്കുറിച്ച് എനിക്ക് പറയാൻ കഴിയും.",

        "bn-IN":
            "আমি আপনাকে মাটির আর্দ্রতা, তাপমাত্রা, আর্দ্রতা, নাইট্রোজেন, ফসফরাস, পটাশিয়াম, NPK এবং আজ জল দিতে হবে কিনা তা বলতে পারি।",

        "gu-IN":
            "હું તમને જમીનની ભેજ, તાપમાન, ભેજનું સ્તર, નાઇટ્રોજન, ફોસ્ફરસ, પોટેશિયમ, NPK અને આજે પાણી આપવું જોઈએ કે નહીં તે જણાવી શકું છું।",

        "pa-IN":
            "ਮੈਂ ਤੁਹਾਨੂੰ ਮਿੱਟੀ ਦੀ ਨਮੀ, ਤਾਪਮਾਨ, ਨਾਈਟ੍ਰੋਜਨ, ਫਾਸਫੋਰਸ, ਪੋਟਾਸ਼ੀਅਮ, NPK ਅਤੇ ਅੱਜ ਪਾਣੀ ਦੇਣਾ ਚਾਹੀਦਾ ਹੈ ਜਾਂ ਨਹੀਂ, ਇਸ ਬਾਰੇ ਦੱਸ ਸਕਦਾ ਹਾਂ।"
    };

    return answers[language] || answers["en-IN"];
}


// ===============================
// QUESTION PROCESSING
// ===============================

function answerQuestion(question, language) {

    const q = question.toLowerCase().trim();


    // -------------------------------
    // NPK
    // -------------------------------

    if (
        q.includes("npk") ||
        (
            q.includes("nitrogen") &&
            q.includes("phosphorus") &&
            q.includes("potassium")
        )
    ) {
        return getNPKAnswer(language);
    }


    // -------------------------------
    // WATERING
    // -------------------------------

    if (
        q.includes("water") ||
        q.includes("watering") ||
        q.includes("irrigat") ||
        q.includes("पानी") ||
        q.includes("पाणी") ||
        q.includes("तुम्हाला पाणी") ||
        q.includes("தண்ணீர்") ||
        q.includes("నీరు") ||
        q.includes("ನೀರು") ||
        q.includes("വെള്ളം") ||
        q.includes("জল") ||
        q.includes("পানি") ||
        q.includes("પાણી")
    ) {
        return getWaterAnswer(language);
    }


    // -------------------------------
    // MOISTURE
    // -------------------------------

    if (
        q.includes("soil moisture") ||
        q.includes("moisture level") ||
        q.includes("moisture") ||
        q.includes("नमी") ||
        q.includes("मातीतील आर्द्रता") ||
        q.includes("मातीतील ओलावा") ||
        q.includes("ஈரப்பதம்") ||
        q.includes("నేల తేమ") ||
        q.includes("తేమ") ||
        q.includes("ಮಣ್ಣಿನ ತೇವಾಂಶ") ||
        q.includes("തണ്ണിലെ ഈർപ്പം") ||
        q.includes("മണ്ണിലെ ഈർപ്പം") ||
        q.includes("আর্দ্রতা") ||
        q.includes("જમીનની ભેજ")
    ) {
        return getMoistureAnswer(language);
    }


    // -------------------------------
    // TEMPERATURE
    // -------------------------------

    if (
        q.includes("temperature") ||
        q.includes("temp") ||
        q.includes("तापमान") ||
        q.includes("तापमान किती") ||
        q.includes("வெப்பநிலை") ||
        q.includes("ఉష్ణోగ్రత") ||
        q.includes("ತಾಪಮಾನ") ||
        q.includes("താപനില") ||
        q.includes("তাপমাত্রা") ||
        q.includes("તાપમાન")
    ) {
        return getTemperatureAnswer(language);
    }


    // -------------------------------
    // HUMIDITY
    // -------------------------------

    if (
        q.includes("humidity") ||
        q.includes("humid") ||
        q.includes("आर्द्रता") ||
        q.includes("हवा में नमी") ||
        q.includes("ஈரப்பதம்") ||
        q.includes("తేమ") ||
        q.includes("ತೇವಾಂಶ") ||
        q.includes("ഈർപ്പം") ||
        q.includes("আর্দ্রতা") ||
        q.includes("ભેજ")
    ) {
        return getHumidityAnswer(language);
    }


    // -------------------------------
    // NITROGEN
    // -------------------------------

    if (
        q.includes("nitrogen") ||
        q.includes("nitrogen level") ||
        q.includes("नाइट्रोजन") ||
        q.includes("नायट्रोजन") ||
        q.includes("நைட்ரஜன்") ||
        q.includes("నత్రజని") ||
        q.includes("సారజని") ||
        q.includes("ಸಾರಜನಕ") ||
        q.includes("നൈട്രജൻ") ||
        q.includes("নাইট্রোজেন") ||
        q.includes("નાઇટ્રોજન")
    ) {
        return getNitrogenAnswer(language);
    }


    // -------------------------------
    // PHOSPHORUS
    // -------------------------------

    if (
        q.includes("phosphorus") ||
        q.includes("phosphorus level") ||
        q.includes("फॉस्फोरस") ||
        q.includes("फॉस्फरस") ||
        q.includes("பாஸ்பரஸ்") ||
        q.includes("భాస్వరం") ||
        q.includes("రంజక") ||
        q.includes("ರಂಜಕ") ||
        q.includes("ഫോസ്ഫറസ്") ||
        q.includes("ফসফরাস") ||
        q.includes("ફોસ્ફરસ")
    ) {
        return getPhosphorusAnswer(language);
    }


    // -------------------------------
    // POTASSIUM
    // -------------------------------

    if (
        q.includes("potassium") ||
        q.includes("potassium level") ||
        q.includes("पोटैशियम") ||
        q.includes("पोटॅशियम") ||
        q.includes("பொட்டாசியம்") ||
        q.includes("పొటాషియం") ||
        q.includes("ಪೊಟ್ಯಾಸಿಯಮ್") ||
        q.includes("ಪೊಟ್ಯಾಶಿಯಂ") ||
        q.includes("പൊട്ടാസ്യം") ||
        q.includes("পটাশিয়াম") ||
        q.includes("પોટેશિયમ")
    ) {
        return getPotassiumAnswer(language);
    }


    // -------------------------------
    // GENERAL SOIL
    // -------------------------------

    if (
        q.includes("soil") ||
        q.includes("crop") ||
        q.includes("plant") ||
        q.includes("मिट्टी") ||
        q.includes("पीक") ||
        q.includes("पौधे") ||
        q.includes("மண்") ||
        q.includes("నేల") ||
        q.includes("ಮಣ್ಣು") ||
        q.includes("മണ്ണ്") ||
        q.includes("মাটি") ||
        q.includes("જમીન")
    ) {
        return getSoilSummary(language);
    }


    // -------------------------------
    // UNKNOWN
    // -------------------------------

    return getUnknownAnswer(language);
}


// ===============================
// SPEECH SYNTHESIS
// ===============================

function speakText(text, language) {

    if (!("speechSynthesis" in window)) {

        alert(
            "Speech synthesis is not supported in this browser."
        );

        return;
    }

    window.speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.lang = language;

    speech.rate = 0.85;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
}


// ===============================
// SPEAK CURRENT ADVICE
// ===============================

function speakAdvice() {

    const language =
        languageSelect
            ? languageSelect.value
            : "en-IN";

    const answer =
        getWaterAnswer(language);

    if (answerText) {
        answerText.textContent = answer;
    }

    speakText(answer, language);
}


// ===============================
// SPEECH RECOGNITION
// ===============================

let recognition = null;

if (
    "webkitSpeechRecognition" in window ||
    "SpeechRecognition" in window
) {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    recognition =
        new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = function () {

        if (microphoneButton) {
            microphoneButton.classList.add("listening");
        }

        if (questionText) {
            questionText.textContent =
                "Listening...";
        }
    };


    recognition.onend = function () {

        if (microphoneButton) {
            microphoneButton.classList.remove("listening");
        }
    };


    recognition.onerror = function (event) {

        console.log(
            "Speech recognition error:",
            event.error
        );

        if (questionText) {
            questionText.textContent =
                "Sorry, I couldn't hear that. Please try again.";
        }
    };


    recognition.onresult = function (event) {

        const question =
            event.results[0][0].transcript;

        const language =
            languageSelect
                ? languageSelect.value
                : "en-IN";

        if (questionText) {
            questionText.textContent =
                question;
        }

        const answer =
            answerQuestion(
                question,
                language
            );

        if (answerText) {
            answerText.textContent =
                answer;
        }

        speakText(
            answer,
            language
        );
    };
}


// ===============================
// MICROPHONE BUTTON
// ===============================

if (microphoneButton) {

    microphoneButton.addEventListener(
        "click",
        function () {

            if (!recognition) {

                alert(
                    "Voice recognition is not supported in this browser. Please use Google Chrome."
                );

                return;
            }

            const language =
                languageSelect
                    ? languageSelect.value
                    : "en-IN";

            recognition.lang = language;

            recognition.start();
        }
    );
}


// ===============================
// LANGUAGE CHANGE
// ===============================

if (languageSelect) {

    languageSelect.addEventListener(
        "change",
        function () {

            if (questionText) {
                questionText.textContent =
                    "Language changed. Ask your question.";
            }

            if (answerText) {
                answerText.textContent =
                    "";
            }
        }
    );
}


// ===============================
// CHART
// ===============================

let moistureHistory = [];
let timeHistory = [];


// Add first reading
moistureHistory.push(
    sensorData.moisture
);

timeHistory.push(
    new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    })
);


const chartCanvas =
    document.getElementById("moistureChart");

let moistureChart = null;


if (chartCanvas && typeof Chart !== "undefined") {

    moistureChart =
        new Chart(
            chartCanvas.getContext("2d"),
            {
                type: "line",

                data: {

                    labels: timeHistory,

                    datasets: [
                        {
                            label: "Soil Moisture (%)",

                            data: moistureHistory,

                            tension: 0.3,

                            fill: false
                        }
                    ]
                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    scales: {

                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            }
        );
}


// ===============================
// UPDATE CHART
// ===============================

function updateChart() {

    if (!moistureChart) {
        return;
    }

    const currentTime =
        new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    moistureHistory.push(
        sensorData.moisture
    );

    timeHistory.push(
        currentTime
    );


    // Keep only the last 10 readings

    if (moistureHistory.length > 10) {

        moistureHistory.shift();
        timeHistory.shift();
    }


    moistureChart.data.labels =
        timeHistory;

    moistureChart.data.datasets[0].data =
        moistureHistory;

    moistureChart.update();
}


// ===============================
// INITIAL DISPLAY
// ===============================

updateDisplay();


// ===============================
// UPDATE EVERY 60 SECONDS
// ===============================

setInterval(
    updateSensors,
    60000
);
const allURLS = {

        "logo": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        "logo2": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",

}

function getURL(key) {
    return allURLS[key];
}

export default getURL;

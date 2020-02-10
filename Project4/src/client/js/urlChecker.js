function isValidURL(url) {
    let isValid = /(^http[s]?:\/{2})|(^www)|(^\/{1,2})igm/.test(url)
    return isValid
}

module.exports = isValidURL
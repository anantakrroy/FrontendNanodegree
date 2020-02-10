import { isValidURL } from './js/urlChecker'
import { handleClassify } from './js/classifyHandler'
import {handleSentiment} from './js/sentimentHandler'
import {handleSummary} from './js/summaryHandler'
import {handleHashtags} from './js/hashtagHandler'

import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/resets.scss'

export {
    isValidURL,
    handleClassify,
    handleSentiment,
    handleSummary,
    handleHashtags
}
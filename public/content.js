const segmenterJa = new Intl.Segmenter("ja-JP", { granularity: "word" });

const currentUrl = window.location.toString()

const delimiter = "&nbsp;&nbsp;"

parseUrl()

function parseUrl() {
  if (currentUrl.includes("www3.nhk.or.jp/news/easy")) {
    parseProviders("NHK_EASY")
    return
  }
  if (currentUrl.includes("www3.nhk.or.jp")) {
    parseProviders("NHK")
  }
}

chrome.runtime.onMessage.addListener((message) => {
  parseProviders(message)
})

function parseProviders(provider) {
  switch (provider) {
    case "NHK_EASY":
      parseNHKEasyNews()
      break
    case "NHK":
      parseNHKNews()
      break
    default:
      break
  }
}

function parseNHKEasyNews() {
  const body = document.querySelectorAll('#js-article-body p');
  body.forEach(ele => {
    ele.querySelectorAll("span").forEach(spanEle => {
      spanEle.innerHTML = spanEle.innerHTML + delimiter
    })
  })

}

function parseNHKNews() {
  const title = document.querySelector('.content--title span');
  // Check if the element exists
  if (title) {
    // Manipulate the element (e.g., change the text)
    title.innerHTML = getSeperatedText(segmenterJa, title)
  } else {
    console.log("title Element not found!");
  }

  const summary = document.querySelector('.content--summary');
  // Check if the element exists
  if (summary) {
    summary.innerHTML = getSeperatedText(segmenterJa, summary)
  } else {
    console.log("summary Element not found!");
  }

  const bodyTitle = document.querySelectorAll('.body-title');
  bodyTitle.forEach(ele => {
    ele.innerHTML = getSeperatedText(segmenterJa, ele)
  })

  const body = document.querySelectorAll('.body-text p');
  body.forEach(ele => {
    ele.innerHTML = getSeperatedText(segmenterJa, ele)
  })
}

/**
 * 
 * @param {Intl.Segmenter} segmenter 
 * @param {Element} element
 * @returns {string}
 */
function getSeperatedText(segmenter, element) {
  const text = element.innerHTML
  const segments = segmenter.segment(text);
  const seperatedText = Array.from(segments).reduce((pre, cur) => {
    if (cur.isWordLike) {
      return pre + cur.segment + delimiter
    }
    return pre + cur.segment
  }, "")
  return seperatedText
}

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => {
    setCounter(counter + 1)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0]
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, { data: counter + 1 });
      }
    })
  })
  setCounter(0)
}

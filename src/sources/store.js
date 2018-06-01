
// const STORAGE_KEY = 'question_id'
export default {
    fetch(STORAGE_KEY) {
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    },
    save(items, STORAGE_KEY) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    },
    delete(STORAGE_KEY) {
        window.localStorage.removeItem(STORAGE_KEY)
    }
}
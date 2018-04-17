
const STORAGE_KEY = 'question_id'
export default {
    fetch() {
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[0]')
    },
    save(items) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
}
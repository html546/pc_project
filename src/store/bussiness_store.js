export default {
    state: {
        currentPage: 1
    },
    mutations: {
        change_page(state, page) {
            state.currentPage = parseInt(page);
        }
    }
}
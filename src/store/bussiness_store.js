export default {
    state: {
        currentPage: 1
    },
    mutations: {
        change_page(state, page) {
            console.log(page, 111111111111111);
            state.currentPage = parseInt(page);
        }
    }
}
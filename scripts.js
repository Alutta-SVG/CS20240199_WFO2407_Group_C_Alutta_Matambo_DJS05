function createStore(reducer) {
    let state;
    const listeners =[];


    fuction getState() {
        return state;
    };

    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }
}
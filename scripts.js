function createStore(reducer) {
    let state;
    const listeners =[];


    fuction getState() {
        return state;
    };

    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    function subscribe(listener) {
        listeners.push(listener)
        return () => {
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    }

    dispatch({});
    return { getState, dispatch, subscribe };

}

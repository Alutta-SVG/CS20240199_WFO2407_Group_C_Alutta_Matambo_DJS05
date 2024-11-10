document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    // Redux-like store implementation
    function createStore(reducer) {
        let state;
        const listeners = [];

        function getState() {
            return state;
        }

        function dispatch(action) {
            state = reducer(state, action);
            listeners.forEach(listener => listener());
        }

        function subscribe(listener) {
            listeners.push(listener);
            return () => {
                const index = listeners.indexOf(listener);
                listeners.splice(index, 1);
            };
        }

        // Initialize the state
        dispatch({});
        return { getState, dispatch, subscribe };
    }

    // Reducer function
    function counterReducer(state = { count: 0 }, action) {
        switch (action.type) {
            case 'INCREMENT':
                return { count: state.count + 1 };
            case 'DECREMENT':
                return { count: state.count - 1 };
            case 'RESET':
                return { count: 0 };
            default:
                return state;
        }
    }

    // Creates the store
    const store = createStore(counterReducer);

    // Reference the output element
    const outputElement = document.getElementById('output');

    // Render function to update HTML based on state
    function render() {
        const state = store.getState();
        outputElement.textContent = `Count: ${state.count}`;
        console.log("Rendered state:", state);
    }

    // Subscribe render to store updates
    store.subscribe(render);

    // Initial render to display the initial state
    render();

    // Example dispatches
    store.dispatch({ type: 'INCREMENT' });
    store.dispatch({ type: 'INCREMENT' });
    store.dispatch({ type: 'DECREMENT' });
    store.dispatch({ type: 'RESET' });
});
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

function counterReducer(state ={ count: 0}, action) {
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
 
const store = createStore(counterReducer);

store.subscribe(() => console.log("state:", store,getState()));

store.dispatch({ type: 'INCREMENT' });
store.dispatch({type:"INCREMENT"});
store.dispatch({type:"DECREMENT"});
store.dispatch({type:"RESET"});
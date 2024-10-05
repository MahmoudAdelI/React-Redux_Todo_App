export const createStore = (reducer, cachedData) => {
    //cached data is used for initializing the state with the cached data in LocalStorage it's true
    let state = cachedData || reducer(undefined, {});
    let listeners = [];
    
    const getState = () => state;

    const dispatch = (action) => {
        //if (chachedData){state = reducer(chachedData, action)}; // Test
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    };

    return {getState, dispatch, subscribe};
}

export const combineReducers = (reducers) => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce((nextState, key) => {
        /* assigning a key inside of the nextState obj named as [key] of the
        reducers keys, remember they are keys inside an obj.
        and the value of that assigned key is the return of invoking its corresponding
        reducer function passing it a state[key] and action, then return the nextState
        wich contains the name of every reducer and its state*/
            nextState[key] = reducers[key](state[key], action);
            return nextState;
        }, {}); // initial value of the next state is an empty obj
    };
};
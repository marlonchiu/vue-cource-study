const getters = {
  appWithVersion: (state) => {
    // return state.appName + 'v3.1'
    return `${state.appName}v3.1`
  }
}

export default getters

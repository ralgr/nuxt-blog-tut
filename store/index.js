// The store below is classic mode is is deprecated

import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts;
            },
            token(state) {
                return state.token;
            },
            isAuthenticated(state) {
                return state.token != null;
            }
        },
        mutations: {
            setLoadedPosts(state, posts) {
                state.loadedPosts = posts;
            },
            addPost(state, newPost) {
                state.loadedPosts.push(newPost);
            },
            editPost(state, editedPost) {    
                // Getting the right post index of the correct post object in the state by using the ID 

                const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id);

                // Accessing the loadedPosts and specifying which post object to edit using the postIndex

                state.loadedPosts[postIndex] = editedPost;
            },
            setToken(state, token) {
                state.token = token;
            },
            clearToken(state) {
                state.token = null
                console.log('Token state: ' + state.token);
            }
        },
        actions: {
            // Special action that is dispatched automatically by Nuxt
            // Initializes the store with data for the first load
            // The payload is always the context, which is the same context 
            // found in 'fetch' and 'asyncData'
            // If large data is needed on multiple pages, this approach
            // would suit it.

            nuxtServerInit(vuexContext, context) {
                return context.app.$axios

                // Then env variable is removed because the same URL
                // is now present as a baseURL in the axios module, made
                // use of using '$get'.

                .$get(`/posts.json`)
                .then(data => {
                    const postsArray =  [];

                    for (const key in data) {
                        postsArray.push({...data[key], id: key})
                    };
                    
                    vuexContext.commit('setLoadedPosts', postsArray)
                })
                .catch(err => context.error(err));

                // Returning a promise is required to determine the async action duration
                // If the code is not async, execute it without the return keyword

                // return new Promise((resolve, reject) => {
                //     setTimeout(() => {
                //         vuexContext.commit('setLoadedPosts', 
                //         [
                //             {
                //                 id: '1',
                //                 postTitle: 'ゴブリンスレイヤー',
                //                 previewText: "A young priestess has formed her first adventuring party, but almost immediately they find themselves in distress. Luckily for her, the Goblin Slayer chose that place as his next killing grounds--a man who's dedicated his life to the extermination of all goblins, by any means necessary. And when rumors of his feats begin to circulate, there's no telling who might come calling next.",
                //                 thumbnail: 'https://s.pacn.ws/1500/w9/gin-no-kisei-cd-dvd-goblin-slayer-limited-edition-580673.1.jpg?pmw9h6'
                //             },
                //             {
                //                 id: '2',
                //                 postTitle: 'ログ・ホライズン',
                //                 previewText: "When thirty thousand Japanese gamers are suddenly trapped in the online game world of 'Elder Tale', a realm of swords and sorcery that was, up until yesterday, very much a fantasy is now their cold, hard reality. Severed from their everyday lives, theyre faced with fighting monsters, eating food with no flavor, and being unable to die?! Amid the chaos in 'Elder Tale' Akihabara, veteran gamer Shiroe locates his old friend Naotsugu and teams up with the beautiful female assassin Akatsuki. Together they embark on an adventure to change the world as they know it!",
                //                 thumbnail: 'https://vignette.wikia.nocookie.net/log-horizon/images/9/93/Character_Slider.jpg/revision/latest/scale-to-width-down/670?cb=20180522155243'
                //             }
                //         ])
                //         resolve();
                //     }, 1000);
                // })
            }, 
            setLoadedPostsAction({ commit }, posts) {
                commit('setLoadedPosts', posts);
            },
            addPostAction({ commit }, newPost) {
                const createdPost = {...newPost, updatedDate: new Date()}

                // Returning the axios call allows a then to be chained from the caller method

                return this.$axios.$post(`/posts.json?auth=${getters.token}`, createdPost)
                .then(data => {
                    commit('addPost', {...createdPost, id: data.name});
                })
                .catch(err => {
                    console.log(err);
                })
            },
            editPostAction({ commit, getters }, editedPost) {
                return this.app.$axios.$put(
                    `/posts/${editedPost.id}.json?auth=${getters.token}`,
                    editedPost
                )
                .then(() => {
                    commit('editPost', editedPost);
                })
                .catch(err => console.log(err));
            },
            authAction({ commit }, authDetails) {
                let authEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbApiKey}`;
                if (!authDetails.isLogin) {
                    authEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbApiKey}`
                };

                return this.$axios.$post(
                    authEndpoint, 
                    {
                        email: authDetails.email,
                        password: authDetails.password,
                        returnSecureToken: true
                    }
                )
                .then(result => {    
                    const tokenExpireVar = new Date().getTime() + +result.expiresIn * 1000;
                                    
                    // Set token in state.

                    commit('setToken', result.idToken);

                    // Store token and expiration in LS.
                    // For use in determining if the token is still valid on page refresh.
                    // Works only for refreshing non-admin pages.

                    localStorage.setItem('token', result.idToken);
                    localStorage.setItem('tokenExpiration', tokenExpireVar);

                    // Store token and expiration in a cookie for use in server.
                    // Allows checking of token in server to be able to access admin pages on page refresh.

                    Cookie.set('jwt', result.idToken);
                    Cookie.set('expirationDate', tokenExpireVar);

                    // Testing the serverMiddleware
                    return this.$axios.$post('http://localhost:3000/api/track-data', {data: 'Authenticated!'})             
                })
                .catch(err => console.log(err));
            },
            initAuth({ commit, dispatch }, req) {
                let token;
                let tokenExpiration;

                if (req) {
                    if (!req.headers.cookie) {
                        return;
                    }

                    const jwtCookie = req.headers.cookie
                        .split(';')
                        .find(c => c.trim().startsWith('jwt='))
                    
                    if (!jwtCookie) {
                        return;
                    }

                     token = jwtCookie.split('=')[1];
                     tokenExpiration = req.headers.cookie
                        .split(';')
                        .find(c => c.trim().startsWith('expirationDate='))
                        .split('=')[1];
                } else {
                     token = localStorage.getItem('token');
                     tokenExpiration = localStorage.getItem('tokenExpiration');
                }

                if (new Date().getTime() > +tokenExpiration || !token) {
                    console.log('Expired or no token detected.');
                    
                    dispatch('logoutAction');
                    return;
                }

               commit('setToken', token)
            },
            logoutAction({ commit }) {
                commit('clearToken');
                Cookie.remove('jwt');
                Cookie.remove('expirationDate');   
                if (process.client) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenExpiration');
                }
            }
        }
    })
}

export default createStore
export class Router extends EventTarget {
    #Routes = Object.create(null);

    on(path, handler) {
        this.#Routes[path] = handler;
        return this;
    }

    navigate(path, { history = "push" } = {}) {
        path = path.startsWith("/") ? path : "/" + path;
        return navigation.navigate(path, { history });
    }

    listen({ autoFire = true } = {}) {
        navigation.addEventListener("navigate", (event) => {
            const url = new URL(event.destination.url);

            event.intercept({
                handler: () => {
                    console.log(url.pathname, this.#Routes);

                    const fn = this.#Routes[url.pathname];
                    if (!fn) {
                        document.body.innerHTML = `<h1>404</h1><p>${url.pathname}</p>`;
                        return;
                    }
                    fn({ url });
                }
            });
        });

        if (autoFire) {
            this.navigate(location.pathname, { history: "replace" });
        }

        return this;
    }
}

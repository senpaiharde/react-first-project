const { Link } = ReactRouterDOM

export function NotFound() {

    return (
        <section className="not-found-container">
            <section className="not-found">
                <h2>Ooops... Error 404</h2>
            </section>
            <p>
                Sorry but the page you are looking for does not exist.
            </p>
            <Link to="/">Back</Link>
        </section>
    )
}
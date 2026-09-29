function ModelCard({ name, provider, response, loading, error }) {
    return (
        <div ClassName="model-card">
            <div className="model-header">
                <div> 
                    <h2> {name}</h2>
                    <p> {provider}</p>
                </div>
            </div>

            <div className="model-response">
                {loading && <p> Waiting for response...</p>}

                {!loading && error && (
                    <p className="error-message"> {error} </p>
                )}

                {!loading && !error && (
                    <p> {response} </p>
                )}
        </div>
        </div>

    );

}
export default ModelCard;
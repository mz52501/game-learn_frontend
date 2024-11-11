import {useFetchData} from "../hooks/UseFetchData";

export default function SelectGame() {

    const {data, loading, error} = useFetchData('/mock-endpoint');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <img src="/images/tree.jpg"/>
        </div>
    )

}

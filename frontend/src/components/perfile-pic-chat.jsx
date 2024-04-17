export function PerfilePicChat({base64}) {
    return (
        <div >
            <div className="w-12 h-12 rounded-full overflow-hidden">
                <img className="object-cover object-center w-full h-full" src={base64} alt="Profile" />
            </div>
        </div>
    );
}
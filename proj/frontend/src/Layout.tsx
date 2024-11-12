import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Cabeçalho */}
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-2xl">Meu Site</h1>
            </header>

            {/* Conteúdo */}
            <main className="flex-grow p-4">{children}</main>

            {/* Rodapé */}
            <footer className="bg-gray-800 text-white p-4 text-center">
                &copy; 2024 Meu Site. Todos os direitos reservados.
            </footer>
        </div>
    );
}

export default Layout;
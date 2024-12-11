import { getConfig } from "@/lib/consul";

export async function getServerSideProps() {
    const title = await getConfig('main.app-title');
    const description = await getConfig('main.app-description')
 
    return {
        props: {
            appTitle: title || 'ЕГАИС Мониторинг',
            appDescription: description || "Управляйте вашими данными из ЕГАИС"
        },
    };
 }
 
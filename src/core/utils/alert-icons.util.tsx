interface IconAlert {
    nameIcon: string;
    icon: JSX.Element;
}

export const IconAlerts: IconAlert[] = [
    {
        nameIcon: 'success',
        icon: (<svg height={30} width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="green" fillOpacity="0.6"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>)
    },
    {
        nameIcon: 'danger',
        icon: (<svg height={30} width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" fill="red" fillOpacity="0.6"><path d="M96 64c0-17.7-14.3-32-32-32S32 46.3 32 64l0 256c0 17.7 14.3 32 32 32s32-14.3 32-32L96 64zM64 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>)
    },
    {
        nameIcon: 'warning',
        icon: (<svg height={30} width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="orange" fillOpacity="0.6"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>)
    },
    {
        nameIcon: 'info',
        icon: (<svg height={30} width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" fill="blue" fillOpacity="0.6"><path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 224 32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0 0-192-32 0c-17.7 0-32-14.3-32-32z"/></svg>)
    }
]
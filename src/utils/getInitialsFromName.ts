

export const getInitialsFromName = (fullName: string) => 
    fullName
    .split(' ')
    .filter((_, index) => index < 2)
    .map(value => value[0])
    .join('')
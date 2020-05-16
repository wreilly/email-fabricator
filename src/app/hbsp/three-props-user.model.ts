export interface ThreePropsUser {
    username: string; // hmm, removing didn't break anything
    profile: {
        email: string;
        institutionName: string;
    };
    // broken: string; // hmm, adding didn't break anything
}

// YES: Used for MatTableDataSource.
export interface ThreePropsUserFlat {
    username: string;
    email: string;
    institutionName: string;
}

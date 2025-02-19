/* Base Types */
type ReduxAction = {
    type: string;
    data: any;
};

/* Types */
type ReduxState = {
    dimensions: Dimensions;
    session: Session | null;
    users: Map<string, User>;
    shows: Map<string, Show>;
    groups: Map<string, Group>;
    episodes: Map<string, Episode>;
    encodes: Map<string, Encode>;
    segments: Map<string, Segment>;
    stats: Stats;
    jobs: Map<string, EncodingJob>;
    random: number;
    preferences: AppPreferences;
    authResult: AuthResult;
    filterData: FilterData;
    playerData: PlayerData;
};

type ConnectedActions = {
    setDimensions(w: number, h: number): ReduxAction;

    createUser(username: string, password: string): ReduxAction;
    fetchUser(id: string): ReduxAction;
    createSession(type: "classic" | "token", username?: string, password?: string): ReduxAction;
    deleteSession(): ReduxAction;
    fetchShow(id: string): ReduxAction;
    fetchAllShows(): ReduxAction;
    fetchShowEpisodes(id: string): ReduxAction;
    fetchGroup(id: string): ReduxAction;
    fetchAllGroups(): ReduxAction;
    fetchEpisode(id: string): ReduxAction;
    fetchAllEpisodes(): ReduxAction;
    fetchEpisodeSegments(id: string): ReduxAction;
    fetchEpisodeEncodes(id: string): ReduxAction;
    fetchEncode(id: string): ReduxAction;
    fetchAllEncodes(): ReduxAction;
    fetchSegment(id: string): ReduxAction;
    fetchAllSegments(): ReduxAction;
    fetchStats(): ReduxAction;
    fetchAllJobs(): ReduxAction;
    pushSubscribe(url: string, key: string, auth: string): ReduxAction;
    pushUnsubscribe(): ReduxAction;
    favourite(id: string): ReduxAction;

    fetchPreferences(): ReduxAction;
    setPreferencesTheme(theme: string): ReduxAction;
    setPreferencesTorrent(torrent: boolean): ReduxAction;
    setPreferencesBlur(blur: boolean): ReduxAction;
    setPreferencesVolume(volume: number): ReduxAction;
    setPreferencesProgress(id: string, time: number): ReduxAction;
    setAuthResult(result: AuthResult): ReduxAction;

    setFilterSearchTerm(searchTerm: string): ReduxAction;
    setFilterType(type: ShowType | null): ReduxAction;
    setFilterFormat(format: AnimeFormat | TVFormat | null): ReduxAction;
    setFilterStatus(status: ShowStatus | null): ReduxAction;
    setFilterGenres(genres: AnimeGenre | TVGenre | null): ReduxAction;
    setFilterSort(sort: FilterSort): ReduxAction;
    setFilterTags(tags: ShowTag | null): ReduxAction;
    setFilterItems(items: number): ReduxAction;
    setFilterGroup(group: FilterGroup): ReduxAction;
    setFilterPage(page: number): ReduxAction;

    setPlayerState(state: PlayerState): ReduxAction;
    setPlayerPreset(preset: EncodePreset): ReduxAction;
    setPlayerTheater(theater: boolean): ReduxAction;
    setPlayerSettings(settings: boolean): ReduxAction;
    setPlayerOverlay(overlay: boolean): ReduxAction;
    setPlayerSubs(subs: PlayerDataSubs): ReduxAction;
    setPlayerAudio(audio: PlayerDataAudio): ReduxAction;
    setPlayerOpNotification(opNotifaction: boolean): ReduxAction;
    setPlayerEdNotification(edNotifaction: boolean): ReduxAction;
    setPlayerResumeNotification(resumeNotifaction: boolean): ReduxAction;
    setPlayerBandwith(bandwith: number): ReduxAction;
    setPlayerManifestLevels(levels: PlayerManifestLevel[]): ReduxAction;
    setPlayerManifestAudio(tracks: PlayerManifestTrack[]): ReduxAction;
    setPlayerManifestSubtitles(tracks: PlayerManifestTrack[]): ReduxAction;
    setPlayerManifestLevel(level: number | null): ReduxAction;
};

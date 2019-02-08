export class ConfigRepository extends Map<string, any> {
    public constructor(config: object) {
        super(Object.entries(config));
    }
}

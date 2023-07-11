import app from '../../app';
export default class IntegrationHelpers {
    public static async getApp():Promise<Express.Application>{
        return app;
    }
}
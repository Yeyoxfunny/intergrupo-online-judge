export class AppSettings{
	public static apiEndPoint = 'http://localhost:3000/api/';

	/* Challenge Settings */
	public static challengeUrl = AppSettings.apiEndPoint + 'challenge/';
	public static filesChallengeUrl = AppSettings.apiEndPoint + 'upload/file/';

	/* User Settings */
	public static userUrl = AppSettings.apiEndPoint + 'users/';
	public static imageProfileUrl = AppSettings.apiEndPoint + 'upload/image/';

	/* User Image Profile */
	public static imageProfileBaseUrl = 'http://localhost:3000/avatars/';

	public static authUrl = AppSettings.apiEndPoint + 'auth/';

  /* Register application in https://apps.dev.microsoft.com */
  /* Client ID Microsoft Auth */
  public static clientID = '8b95bf23-aaf7-4ce3-8f9d-5fce82c8ed46';

  /* Add this path in .angular-cli.json */
  public static tokenProcessorUrl = 'http://localhost:4200/node_modules/kurvejs/dist/login.html';
}

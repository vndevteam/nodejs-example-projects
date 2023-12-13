import { Module, Provider } from '@nestjs/common';
import { AppConfigService } from './services/app-config.service';

const providers: Provider[] = [AppConfigService];

@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class SharedModule {}

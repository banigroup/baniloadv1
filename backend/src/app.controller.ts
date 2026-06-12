import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  health() {
    return { 
      status: 'ok', 
      app: 'BaniLoad V1',
      timestamp: new Date().toISOString() 
    };
  }
}


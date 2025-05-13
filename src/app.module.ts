import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import  {TypeOrmModule} from '@nestjs/typeorm'
import { userModule } from './user/user.module';
import { airportsModule } from './layers/airport/airport.module';
import { DepartmentModule } from './layers/department/department.module';
import { CountryModule } from './layers/country/country.module';
import { CityModule } from './layers/city/city.module';
import { HydrographyModule } from './layers/hydrography/hydrography.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'lineab',
      autoLoadEntities: true,
      synchronize: false,
    }),
    userModule,
    airportsModule,
    DepartmentModule,
    CountryModule,
    CityModule,
    HydrographyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

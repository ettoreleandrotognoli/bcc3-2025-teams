import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() data: any) {
    return this.userService.create(data);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.userService.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}

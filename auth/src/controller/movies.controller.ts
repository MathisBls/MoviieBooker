import { Controller, Get, Query, Param } from '@nestjs/common';
import { MoviesService } from '../service/movies.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({
    summary: 'Récupérer les films (avec recherche, pagination et tri)',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Titre à rechercher',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page de pagination (par défaut : 1)',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Critère de tri (par défaut : popularity.desc)',
  })
  @Get()
  async getMovies(
    @Query('search') search?: string,
    @Query('page') page: number = 1,
    @Query('sort') sort: string = 'popularity.desc',
  ) {
    return this.moviesService.getMovies(search, page, sort);
  }

  @ApiOperation({ summary: 'Récupérer les films en salle actuellement' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page de pagination (par défaut : 1)',
  })
  @Get('now-playing')
  async getNowPlaying(@Query('page') page: number = 1) {
    return this.moviesService.getNowPlaying(page);
  }

  @ApiOperation({ summary: 'Obtenir les détails d’un film spécifique' })
  @ApiQuery({
    name: 'id',
    required: true,
    description: 'Identifiant unique du film',
  })
  @Get(':id')
  async getMovieDetails(@Param('id') movieId: number) {
    return this.moviesService.getMovieDetails(movieId);
  }
}

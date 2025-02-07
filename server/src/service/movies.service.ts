import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(private readonly httpService: HttpService) {}

  async getMovies(
    search?: string,
    page: number = 1,
    sort: string = 'popularity.desc',
  ): Promise<any> {
    try {
      const params: any = {
        api_key: process.env.TMDB_API_KEY,
        page,
      };

      if (search) {
        params.query = search;
        const response = await firstValueFrom(
          this.httpService.get(`${this.baseUrl}/search/movie`, { params }),
        );
        return response.data;
      } else {
        params.sort_by = sort;
        const response = await firstValueFrom(
          this.httpService.get(`${this.baseUrl}/discover/movie`, { params }),
        );
        return response.data;
      }
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des films.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getNowPlaying(page: number = 1): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/movie/now_playing`, {
          params: { api_key: process.env.TMDB_API_KEY, page },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des films en salle.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getMovieDetails(movieId: number): Promise<any> {
    try {
      if (!movieId) {
        throw new HttpException(
          "L'ID du film est requis.",
          HttpStatus.BAD_REQUEST,
        );
      }

      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/movie/${movieId}`, {
          params: { api_key: process.env.TMDB_API_KEY },
        }),
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Film non trouvé.', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Erreur lors de la récupération des détails du film.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointments from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id; // middleware autenticação

    const { year, month, day } = request.query;

    const listProviderAppointments = container.resolve(
      ListProviderAppointments,
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    });
    return response.json(classToClass(appointments));
  }
}

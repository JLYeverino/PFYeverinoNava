import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlumnoService } from './alumno.service';
import { of } from 'rxjs';

describe('AlumnoService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: AlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new AlumnoService(httpClientSpy as any);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
  it('El servicio retorna un arreglo de alumnos mockeados', (done: DoneFn) => {
    const mockDatos = [
      {"id":1,"nombre":"Jose","apellido":"Yeverino","email":"luisyn7@gmail.com","telefono":8181861732,"edad":22},
      {"id":2,"nombre":"Luis","apellido":"Nava","email":"jose.yeve@hotmail.com","telefono":8112729350,"edad":25}
    ];

    httpClientSpy.get.and.returnValue(of(mockDatos));

    service.obtenerAlumnos().subscribe((alumnos) => {
      const mockDatos2 = [
        {"id":1,"nombre":"Jose","apellido":"Yeverino","email":"luisyn7@gmail.com","telefono":8181861732,"edad":22},
        {"id":2,"nombre":"Luis","apellido":"Nava","email":"jose.yeve@hotmail.com","telefono":8112729350,"edad":25}
      ];
      expect(alumnos).toEqual(mockDatos2);
      done();
    })
  })
});

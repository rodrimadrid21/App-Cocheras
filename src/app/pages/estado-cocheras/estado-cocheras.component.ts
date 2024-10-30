import { Component, inject, NgModule } from '@angular/core';
import { RouterModule, Router, RouterLink } from '@angular/router';
import { iCochera } from '../../interfaces/cochera';
import { CommonModule, NgClass } from '@angular/common';
import { DataCocherasService } from '../../services/data-cocheras.service';
import { DataAuthService } from '../../services/data-auth.service';
import Swal from 'sweetalert2';
import { DataTarifasService } from '../../services/data-tarifa.service';

@Component({
  selector: 'app-estado-cocheras',
  standalone: true,
  imports: [RouterModule, NgClass, CommonModule],
  templateUrl: './estado-cocheras.component.html',
  styleUrl: './estado-cocheras.component.scss'
})
export class EstadoCocherasComponent {
  // Inyecta el servicio
  AuthService = inject(DataAuthService)

  dataTarifasService = inject(DataTarifasService);

  router = inject(Router);

  isAdmin = true
  
  dataCocherasService = inject(DataCocherasService)
  
  // Métodos para llamar a las funciones del servicio
  // Métodos para alternar el estado de la cochera
  preguntarAgregarCochera(){
    Swal.fire({
      title: "Ingrese cochera",
      showCancelButton: true,
      confirmButtonText: "Agregar",
      denyButtonText: `Cancelar`,
      input: "text",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.dataCocherasService.agregarCochera(result.value)
      } else if (result.isDenied) {
      }
    });
  }

  preguntarDeshabilitarCochera(cocheraId: number){
    Swal.fire({
      title: "Deshabilitar cochera?",
      showCancelButton: true,
      confirmButtonText: "Deshabilitar",
      denyButtonText: `Cancelar`
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.dataCocherasService.deshabilitarCochera(cocheraId)
      } else if (result.isDenied) {
      }
    });
  }

  preguntarHabilitarCochera(cocheraId: number){
    Swal.fire({
      title: "Hablitar cochera?",
      showCancelButton: true,
      confirmButtonText: "Habilitar",
      denyButtonText: `Cancelar`
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.dataCocherasService.habilitarCochera(cocheraId)
      } else if (result.isDenied) {
      }
    });
  }

  preguntarBorrarCochera(cocheraId: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Si eliminas esta cochera, no podrás revertirlo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, estoy seguro",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.dataCocherasService.borrarFila(cocheraId)
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
  
  preguntarBorrarTodo(){
    Swal.fire({
      title: "Deseas eliminar todas las cocheras?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.dataCocherasService.borrarTodo()
      } else if (result.isDenied) {
      }
    });
  }

  abrirEstacionamiento(idCochera: number) {
    const idUsuarioIngreso = "1"
    Swal.fire({
      title: "Ingrese la patente del vehiculo",
      html: `<input type="text" id="patente" class="swal2-input" placeholder="Ingrese patente">`,
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const patenteInput = document.getElementById("patente") as HTMLInputElement
        if (!patenteInput || !patenteInput.value) {
          Swal.showValidationMessage("Por favor, ingrese una patente")
          return false;
        }
        return { patente: patenteInput.value };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { patente } = result.value;
        await this.dataCocherasService.abrirEstacionamiento(patente, idUsuarioIngreso, idCochera);
      }
    })
  }

  cerrarEstacionamiento(cochera: iCochera) {
    const horario = cochera.estacionamiento?.horaIngreso;
    let fechaIngreso;
    let horasPasadas = 0; 
    let minutosPasados = 0; 
    let patente: string;
    let tarifaABuscar: string;
    let total;

    if (horario) {
        fechaIngreso = new Date(horario);

        if (fechaIngreso) {
            const fechaActual = new Date();
            const diferenciaEnMilisegundos = fechaActual.getTime() - fechaIngreso.getTime();
            horasPasadas = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60));
            minutosPasados = Math.floor((diferenciaEnMilisegundos % (1000 * 60 * 60)) / (1000 * 60));
        }

        patente = cochera.estacionamiento?.patente!;

        const totalMinutos = horasPasadas * 60 + minutosPasados;
        if (totalMinutos <= 30) {
            tarifaABuscar = "MEDIA HORA";
        } else if (totalMinutos <= 60) {
            tarifaABuscar = "PRIMERA HORA";
        } else {
            tarifaABuscar = "VALOR HORA";
        }

        const tarifa = this.dataTarifasService.tarifas.find(t => t.descripcion === tarifaABuscar);
        total = tarifa ? Number(tarifa.valor) : 0;
    }

    const horaFormateada = fechaIngreso ? fechaIngreso.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    Swal.fire({
        html: `
            <div style="text-align: left;">
                <h4>Horario de inicio: ${horaFormateada}</h4>
                <h4>Tiempo transcurrido: ${horasPasadas} horas y ${minutosPasados} minutos</h4>
                <hr style="border: 1px solid #ccc;">
                <h2 style="margin: 20px 0 10px; text-align: center;">Total a cobrar</h2>
                <div style="background-color: #28a745; color: white; font-size: 24px; padding: 10px; border-radius: 5px; text-align: center; margin: 0 auto; display: block; width: fit-content;">
                    $${total}
                </div>
                <div style="margin-top: 20px; text-align: center;">
                    <button id="cobrar" class="swal2-confirm swal2-styled" style="background-color: #007bff; padding: 10px 24px;">Cobrar</button>
                    <button id="volver" class="swal2-cancel swal2-styled" style="background-color: #aaa; padding: 10px 24px;">Volver</button>
                </div>
            </div>`,
        showConfirmButton: false,
        didOpen: () => {
            const cobrarButton = document.getElementById('cobrar');
            const volverButton = document.getElementById('volver');
            
            if (cobrarButton) {
                cobrarButton.addEventListener('click', async () => {
                    const idUsuarioEgreso = "1";
                    await this.dataCocherasService.cerrarEstacionamiento(patente, idUsuarioEgreso);
                    // Usar el id del estacionamiento, no el id de la cochera
              const estacionamientoId = cochera.estacionamiento?.id;
              if (estacionamientoId) {
                await this.dataCocherasService.deleteEstacionamiento(estacionamientoId);
                Swal.fire("Estacionamiento eliminado con éxito", "", "success");
                Swal.close();
              } else {
                console.error("ID de estacionamiento no encontrado para eliminar.");
              }
            });
          }
  
          if (volverButton) {
            volverButton.addEventListener('click', () => {
              Swal.close();
          });
        }
      },
    });
  }
}

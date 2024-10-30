import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { DataPreciosService } from '../../services/data-precios.service';
import { Precio } from '../../interfaces/precios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-precios',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent {

  precios: Precio[] = [];//almacenará los precios obtenidos del servicio
  preciosService = inject(DataPreciosService);

  constructor() {
    this.cargarPrecios();
  }

  // Método para cargar precios desde el servicio
  async cargarPrecios(): Promise<void> {
    try {
      this.precios = await this.preciosService.getPrecios();
    } catch (error) {
      console.error('Error cargando los precios:', error);
    }
  }

  // Método para editar el precio
  async editarPrecio(precio: Precio): Promise<void> {
    const { value: nuevoPrecio } = await Swal.fire({
      title: `Modificar precio para ${precio.descripcion}`,
      input: 'number',
      inputLabel: 'Nuevo Precio',
      inputValue: precio.valor, // Valor inicial del campo
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue <= 0) {
          return 'Debe ingresar un valor positivo';
        }
        return null;
      }
    });

    // Si se ingresa un nuevo precio
    if (nuevoPrecio) {
      precio.valor = nuevoPrecio; //Actualiza el costo
      try {
        //llama al servicio para actualizar el precio en la bdd
        await this.preciosService.updatePrecio(precio);
        Swal.fire(`Precio actualizado a ${nuevoPrecio} para ${precio.descripcion}`, '', 'success');
        this.cargarPrecios(); //recarga los precios después de la actualización
      } catch (error) {
        console.error('Error al actualizar el precio:', error);
      }
    }
  }

  // Método para borrar un precio
  async borrarPrecio(precio: Precio): Promise<void> {
    const resultado = await Swal.fire({
      title: `¿Borrar precio para ${precio.descripcion}?`,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      icon: 'warning',
      confirmButtonColor: '#dc3545'
    });

    // Si el usuario confirma la acción
    if (resultado.isConfirmed) {
      try {
        //llama al servicio para borrar el precio de la bbb
        await this.preciosService.deletePrecio(precio.id!);
        Swal.fire('Eliminado', `El precio para ${precio.descripcion} ha sido eliminado`, 'success');
        this.cargarPrecios();//recarga los precios después de la actualización
      } catch (error) {
        console.error('Error al borrar el precio:', error);
      }
    }
  }

  // Método para agregar un nuevo precio
  async agregarPrecio(): Promise<void> {
    const { value: nuevoTiempo } = await Swal.fire({
      title: 'Agregar nuevo precio',
      input: 'text',
      inputLabel: 'Descripción del Tiempo (Ej: Media Hora, 1 Hora, etc.)',
      inputPlaceholder: 'Ingresa el tiempo',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar'
    });
// Si se ingresa un nuevo tiempo
    if (nuevoTiempo) {
      const { value: costo } = await Swal.fire({
        title: `Ingresar costo para ${nuevoTiempo}`,// Título del diálogo para ingresar costo
        input: 'number',// Tipo de entrada para el costo
        inputLabel: 'Costo',
        inputPlaceholder: 'Ingresa el costo',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          const numValue = Number(value);
          // Valida que el costo sea un número mayor a 0
          if (isNaN(numValue) || numValue <= 0) {//isNaN devuelve true si el valor pasado no puede ser convertido a un número
            return 'Debe ingresar un valor mayor a 0';
          }
          return null;
        }
      });
// Si se ingresa un costo válido
      if (costo) {
        // Crea un nuevo objeto Precio
        const nuevoPrecio: Precio = { descripcion: nuevoTiempo, valor: costo }; // Usar la interfaz
        try {
          await this.preciosService.createPrecio(nuevoPrecio);
          Swal.fire('Agregado', `Nuevo precio para ${nuevoTiempo} con costo ${costo}`, 'success');
          this.cargarPrecios();
        } catch (error) {
          console.error('Error al crear el precio:', error);
        }
      }
    }
  }
}

import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [

    {
        routeLink: 'home',              
        icon: 'fal fa-home',
        label: 'Home',
        rolesToShow: ['admin','user']
    },
    {
        routeLink: 'admonUser',
        icon: 'far fa-unlock-alt',
        label: 'Administracion',
        rolesToShow: ['admin']
    },
    {
        routeLink: 'upload',
        icon: 'far fa-arrow-alt-circle-up',
        label: 'Upload',
        rolesToShow: ['admin']
    },
    {
        routeLink: null,          
        icon: 'fa fa-folder',
        label: 'Gestion Documental',
        items : [
            {
                routeLink : 'documentos/documentosFresmar',
                icon: 'fa fa-folder',
                label: 'Comunicados'
            },
            {
                routeLink : 'documentos/plantillasFresmar',
                label : 'Formatos'
            },
            {
                routeLink : 'documentos/manuales-Guias-Fresmar',
                icon: 'fa fa-file',
                label: 'Manuales'
            },
            {
                routeLink : 'documentos/logosFresmar',
                label: 'Logos'
            },
         
        ],
        rolesToShow: ['admin','user']
    },
    {
        routeLink: null,          
        icon: 'fa fa-folder',
        label: 'Solicitudes',
        items : [
    /*         {
                routeLink : 'solicitudes/auxilios',
                icon: 'fa fa-folder',
                label: 'Auxilios'
            }, */
            {
                routeLink : 'solicitudes/cartaLaboral',
                label : 'Carta Laboral'
            },
/*             {
                routeLink : 'solicitudes/cesantias',
                icon: 'fa fa-file',
                label: 'Cesantias'
            }, */
            {
                routeLink : 'solicitudes/licencias',
                label: 'Licencias'
            },
            {
                routeLink : 'solicitudes/permisos',
                label: 'Permisos'
            },
        /*     {
                routeLink : 'solicitudes/prestamos',
                label: 'Prestamos'
            }, */
            {
                routeLink : 'solicitudes/vacaciones',
                label: 'Vacaciones'
            }
         
        ],
        rolesToShow: ['admin','user']
    },
    {
        routeLink: 'calendario',
        icon: 'fal fa-calendar',
        label: 'Calendario de Eventos',
        rolesToShow: ['admin','user']
    },
     {
        href: "http://172.16.1.248/moodle/",
        icon: 'fal fa-graduation-cap',
        label: 'Centro Capacitación Fresmar',
        external : true,
        rolesToShow: ['admin','user']
    },
    {
        href: "http://172.16.1.249:4244/home",
        icon: 'fal fa-university',   
        label: 'Cuadre Caja',
        external:true,
        rolesToShow: ['admin','user']
    },
    {
        href: "http://www.fresmar.com/",
        icon: 'fal fa-store',   
        label: 'Pagina Web',
        external:true,
        rolesToShow: ['admin','user']
    },
    {
        href: "http://172.16.1.252/glpi/",
        icon: 'fal fa-sitemap',   
        label: 'GLPI (Tiquetes)',
        external:true,
        rolesToShow: ['admin','user']
    },    
/*     {
        routeLink: 'logout',
        icon: 'fal fa-sign-in',
        label: 'Cerrar Sesión',
        rolesToShow: ['admin','user']
    } */
];


'use client';

import DeleteLinkModal from './components/DeleteLinkModal';
import EditLinkFormModal from './components/EditEditFormModal';
import { ClipBoardButton } from '@/components/Clipboard';
import { Button } from '@/components/ui/button';
import { LinkResponseProps, TripResponseProps } from '@/services/trip';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { Fragment, useState } from 'react';

type LinksProps = {
    links: LinkResponseProps[];
    trip: TripResponseProps;
};

export function Links({ links, trip }: LinksProps) {
    const [openLinkDeleteModal, setOpenLinkDeleteModal] = useState(false);
    const [openLinkEditModal, setOpenLinkEditModal] = useState(false);
    const [selectedLink, setSelectedLink] = useState<LinkResponseProps | null>(null);

    const activeLinkDeleteConfirmationModal = (link: LinkResponseProps) => {
        setSelectedLink(link);
        setOpenLinkDeleteModal(true);
    };

    const activeLinkEditModal = (link: LinkResponseProps) => {
        setSelectedLink(link);
        setOpenLinkEditModal(true);
    };
    return (
        <Fragment>
            {links.map(link => (
                <div key={link.id} className="py-5 flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-3">
                            <span className="text-md text-zinc-800 dark:text-zinc-100 font-bold">{link.title}</span>
                            <span className="text-xs truncate w-[250px] sm:w-[300px] text-zinc-600 dark:text-zinc-400">
                                {link.url}
                            </span>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <EllipsisVertical />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => ClipBoardButton(link.url)}>
                                        Copiar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => activeLinkEditModal(link)}>
                                        Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => activeLinkDeleteConfirmationModal(link)}>
                                        Deletar
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <EditLinkFormModal
                        link={selectedLink!}
                        trip={trip}
                        openLinkEditModal={openLinkEditModal}
                        setOpenLinkEditModal={setOpenLinkEditModal}
                    />
                    <DeleteLinkModal
                        trip={trip}
                        link={selectedLink!}
                        openLinkDeleteModal={openLinkDeleteModal}
                        setOpenLinkDeleteModal={setOpenLinkDeleteModal}
                    />
                </div>
            ))}
        </Fragment>
    );
}
